class Utils {
  public getTotalPage(totalRecord: number, limit: number) {
    if (totalRecord % limit !== 0) {
      return Math.floor(totalRecord / limit) + 1;
    } else {
      return Math.floor(totalRecord / limit);
    }
  }

  public formatMoney(amount: number) {
    return amount.toLocaleString("vi-VN");
  }
}
const utils = new Utils();
export default utils;
