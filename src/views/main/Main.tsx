import { ImBook } from "react-icons/im";
import { BsGraphUpArrow } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiDiscount1 } from "react-icons/ci";
import { TbBuildingWarehouse } from "react-icons/tb";

function MainPage() {
  return (
    <div>
      <a href="/books/search">
        <ImBook />
        도서 검색
      </a>
      <a href="/policies">
        <CiDiscount1 />
        정책 조회
      </a>
      <a href="/stocks">
        <TbBuildingWarehouse />
        재고 검색
      </a>
      <a href="/purchase-order/create">
        <CiDeliveryTruck />
        발주 신청
      </a>
      <a href="/statistics/revenue">
        <BsGraphUpArrow />
        매출 통계
      </a>
    </div>
  );
}

export default MainPage;
