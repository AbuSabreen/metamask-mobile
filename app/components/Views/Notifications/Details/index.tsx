/* eslint-disable react/display-name */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { capitalize } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import {
  Notification,
  TRIGGER_TYPES,
  formatDate,
  formatNotificationTitle,
} from '../../../../util/notifications';

import { useTheme } from '../../../../util/theme';

import ClipboardManager from '../../../../core/ClipboardManager';
import { strings } from '../../../../../locales/i18n';

import Icon, {
  IconName,
  IconSize,
} from '../../../../component-library/components/Icons/Icon';
import { AvatarAccountType } from '../../../../component-library/components/Avatars/Avatar';

import { showAlert } from '../../../../actions/alert';
import { protectWalletModalVisible } from '../../../../actions/user';

import { createStyles } from './styles';

import renderAnnouncementsDetails from './Announcements';
import renderTXDetails from './TX';
import Header from './Header';

interface Props {
  route: {
    params: {
      notification: Notification;
    };
  };
}

const NotificationsDetails = (props: Props) => {
  const { notification } = props.route.params;

  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();

  const accountAvatarType = useSelector((state: any) =>
    state.settings.useBlockieIcon
      ? AvatarAccountType.Blockies
      : AvatarAccountType.JazzIcon,
  );

  const handleShowAlert = (config: {
    isVisible: boolean;
    autodismiss: number;
    content: string;
    data: { msg: string };
  }) => dispatch(showAlert(config));

  const handleProtectWalletModalVisible = () =>
    dispatch(protectWalletModalVisible());

  const copyToClipboard = async (type: string, selectedString?: string) => {
    if (!selectedString) return;
    await ClipboardManager.setString(selectedString);
    handleShowAlert({
      isVisible: true,
      autodismiss: 1500,
      content: 'clipboard-alert',
      data: {
        msg:
          type === 'address'
            ? strings('notifications.address_copied_to_clipboard')
            : strings('notifications.transaction_id_copied_to_clipboard'),
      },
    });
    setTimeout(() => handleProtectWalletModalVisible(), 2000);
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainerWrapper}>
      {notification.type === TRIGGER_TYPES.FEATURES_ANNOUNCEMENT
        ? renderAnnouncementsDetails(notification, styles, navigation)
        : renderTXDetails({
            notification,
            styles,
            theme,
            accountAvatarType,
            navigation,
            copyToClipboard,
          })}
    </ScrollView>
  );
};

export default NotificationsDetails;

NotificationsDetails.navigationOptions = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => ({
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon
        name={IconName.ArrowLeft}
        size={IconSize.Md}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ marginHorizontal: 20 }}
      />
    </TouchableOpacity>
  ),
  headerTitle: () => (
    <Header
      title={capitalize(
        route.params.notification.type === TRIGGER_TYPES.FEATURES_ANNOUNCEMENT
          ? route.params.notification.title
          : formatNotificationTitle(route.params.notification.type),
      )}
      subtitle={formatDate(route.params.notification.createdAt)}
    />
  ),
});
