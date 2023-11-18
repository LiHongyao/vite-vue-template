export interface FiltersProps {
  isBangScreen: () => boolean;
}
const filters: FiltersProps = {
  /**
   * 判断是否是刘海屏
   * @returns
   */
  isBangScreen: () => {
    return (
      window && window.screen.height >= 812 && window.devicePixelRatio >= 2
    );
  },
};
export default filters;
