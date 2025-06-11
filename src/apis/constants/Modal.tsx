import React, { useEffect } from "react";

interface ModalProps {
  title?: string;
  setModal: () => void;
  children?: React.ReactNode;
}

// 모달 내부를 눌렀을 때 모달창이 닫히는 것 방지
const Modal = ({ title, setModal, children }: ModalProps) => {
  const preventOffModal = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  // 모달창이 뜬 상태에서는 뒷 화면 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  // 모달창
  return (
    <div
      id="모달 외부"
      onClick={setModal}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        id="모달"
        onClick={preventOffModal}
        style={{
        backgroundColor: "white",
        width: "300px",
        height: "300px",
        margin: "auto"
      }}
      >
        <div className="text-gray-400">{title}</div>
        {children}
      </div>
    </div>
  );
};

export default Modal;