/* eslint-disable @typescript-eslint/default-param-last */
import { ActionType, Action } from '../../actions/security';
import { SecuritySettingsState } from '../../actions/security/state';

export const initialState: Readonly<SecuritySettingsState> = {
  allowLoginWithRememberMe: false,
  automaticSecurityChecksEnabled: false,
  hasUserSelectedAutomaticSecurityCheckOption: false,
  isAutomaticSecurityChecksModalOpen: false,
  dataCollectionForMarketing: null,
  isNFTAutoDetectionModalOpened: false,
};

const securityReducer = (
  state: SecuritySettingsState = initialState,
  action: Action,
): SecuritySettingsState => {
  switch (action.type) {
    case ActionType.SET_ALLOW_LOGIN_WITH_REMEMBER_ME:
      return {
        ...state,
        allowLoginWithRememberMe: action.enabled,
      };
    case ActionType.SET_AUTOMATIC_SECURITY_CHECKS:
      return {
        ...state,
        automaticSecurityChecksEnabled: action.enabled,
      };
    case ActionType.USER_SELECTED_AUTOMATIC_SECURITY_CHECKS_OPTION:
      return {
        ...state,
        hasUserSelectedAutomaticSecurityCheckOption: action.selected,
      };
    case ActionType.SET_AUTOMATIC_SECURITY_CHECKS_MODAL_OPEN:
      return {
        ...state,
        isAutomaticSecurityChecksModalOpen: action.open,
      };
    case ActionType.SET_NFT_AUTO_DETECTION_MODAL_OPEN:
      return {
        ...state,
        isNFTAutoDetectionModalOpened: action.open,
      };
    case ActionType.SET_DATA_COLLECTION_FOR_MARKETING:
      return {
        ...state,
        dataCollectionForMarketing: action.enabled,
      };
    default:
      return state;
  }
};

export default securityReducer;
