import Modal from "@/apis/constants/Modal";
import { createPurchaseOrder } from "@/apis/purchaseOrder/purchaseOrder";
import { PurchaseOrderCreateRequestDto } from "@/dtos/purchaseOrder/request/purchaseOrder-create.request.dto";
import { PurchaseOrderRequestDto } from "@/dtos/purchaseOrder/request/purchaseOrder.request.dto";
import { PurchaseOrderResponseDto } from "@/dtos/purchaseOrder/response/purchaseOrder.response.dto";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

function CreatePurchaseOrder() {
  const [form, setForm] = useState({
    isbn: "",
    purchaseOrderAmount: "",
  });
  const [purchaseOrders, setRequestOrders] = useState<
    PurchaseOrderRequestDto[]
  >([]);
  const [responseOrders, setResponseOrders] = useState<
    PurchaseOrderResponseDto[]
  >([]);
  const [message, setMessage] = useState("");
  const [modalStatus, setModalStatus] = useState(false);
  const [employee, setEmployee] = useState({
    employeeName: "",
  });
  const [cookies] = useCookies(["accessToken"]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 추가 버튼 누르면
  const onAddPurchaseOrder = () => {
    const { isbn, purchaseOrderAmount } = form;

    if (!isbn || !purchaseOrderAmount) {
      setMessage("모든 항목을 입력해주세요");
      return;
    }

    const parsedAmount = parseInt(purchaseOrderAmount, 10);

    const newPurchaseOrder: PurchaseOrderRequestDto = {
      isbn,
      purchaseOrderAmount: parsedAmount,
    };
    setRequestOrders([...purchaseOrders, newPurchaseOrder]);

    setForm({ isbn: "", purchaseOrderAmount: "" });

    setMessage("");
  };

  // 노출 리스트(request)
  const reqeustPurchaseOrderList = purchaseOrders.map(
    (purchaseOrder, index) => {
      return (
        <tr key={index}>
          <td>{purchaseOrder.isbn}</td>
          <td>{purchaseOrder.purchaseOrderAmount}</td>
        </tr>
      );
    }
  );

  // 등록 기능
  const onCreatePurchaseOrderClick = async () => {
    if (purchaseOrders.length === 0) {
      setMessage("등록하실 발주서를 입력하세요.");
      return;
    }

    const requestBody: PurchaseOrderCreateRequestDto = { purchaseOrders };
    const token = cookies.accessToken;

    if (!token) {
      alert("인증 토큰이 없습니다.");
      return;
    }

    try {

      const response = await createPurchaseOrder(requestBody, token);
      const { code, message, data: responseOrders } = response;
      
      if (code != "SU") {
        setMessage(message);
        return;
      }
      
      if (Array.isArray(responseOrders)) {
        setResponseOrders(responseOrders);
        setMessage("");
      } else {
        setMessage("데이터 형식이 올바르지 않습니다.");
      }
      
      setRequestOrders([]);
      
      setModalStatus(true);
    } catch (error) {
      console.error(error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  // 노출 리스트(response)
  const responsePurchaseOrderList = responseOrders.map(
    (purchaseOrder, index) => {
      return (
        <tr key={index}>
          <td>{purchaseOrder.branchName}</td>
          <td>{purchaseOrder.branchLocation}</td>
          <td>{purchaseOrder.employeeName}</td>
          <td>{purchaseOrder.isbn}</td>
          <td>{purchaseOrder.bookTitle}</td>
          <td>{purchaseOrder.bookPrice}</td>
          <td>{purchaseOrder.purchaseOrderAmount}</td>
          <td>{purchaseOrder.purchaseOrderPrice}</td>
          <td>{new Date(purchaseOrder.purchaseOrderDateAt).toLocaleString(
              "ko-KR"
            )}</td>
          <td>요청중</td>
        </tr>
      );
    }
  );

  const modalContent: React.ReactNode = (
    <>
      <h3>발주서 등록이 완료되었습니다.</h3>
      <table>
        <thead>
          <tr>
            <th>지점명</th>
            <th>지점 주소</th>
            <th>발주 담당 사원</th>
            <th>ISBN</th>
            <th>책 제목</th>
            <th>책 가격</th>
            <th>발주 수량</th>
            <th>총 가격</th>
            <th>발주 일자</th>
            <th>승인 상태</th>
          </tr>
        </thead>
        <tbody>{responsePurchaseOrderList}</tbody>
      </table>
      {message && <p>{message}</p>}
    </>
  );

  return (
    <div>
      <h2>발주서 작성</h2>
      <input
        type="text"
        placeholder="ISBN"
        name="isbn"
        value={form.isbn}
        onChange={onInputChange}
      />
      <input
        type="text"
        placeholder="발주량"
        name="purchaseOrderAmount"
        value={form.purchaseOrderAmount}
        onChange={onInputChange}
      />
      <button
        className="searchAll"
        style={{ backgroundColor: "#2b5480" }}
        onClick={onAddPurchaseOrder}
      >
        +
      </button>
      <button onClick={onCreatePurchaseOrderClick}>등록</button>
      {message && <p>{message}</p>}

      <table style={{ tableLayout: 'fixed', width: '400px', marginLeft: 0 }}>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>발주량</th>
          </tr>
        </thead>
        <tbody>{reqeustPurchaseOrderList}</tbody>
      </table>
      <br />

      {modalStatus && (
        <Modal
          isOpen={modalStatus}
          onClose={() => {
            setModalStatus(false);
            setResponseOrders([]);
            setMessage("");
          }}
          children={modalContent}
        />
      )}
    </div>
  );
}

export default CreatePurchaseOrder;
