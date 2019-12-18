// NavigationService.js
import { NavigationActions } from 'react-navigation';
let _navigator;
function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;

}
function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}
function navigateToSubRoute(routeName,params,subRoute,subParam){
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
      action: NavigationActions.navigate({ routeName: subRoute,
        params:subParam
      }),
    })
  );
}
function goBackScreen(routeName, params) {
  _navigator.dispatch(
     NavigationActions.back()
  );
}
function getNavigationProps() {
  return _navigator
}
function getScreenPropsOfNavigation(){
  return _navigator.props.screenProps
}
function updateBadgeCount(count){
   return getScreenPropsOfNavigation().updateNotiFicationBadge(count);
}
// add other navigation functions that you need and export them
export default {
  navigate,
  goBackScreen,
  setTopLevelNavigator,
  getNavigationProps,
  navigateToSubRoute,
  getScreenPropsOfNavigation,
  updateBadgeCount
};