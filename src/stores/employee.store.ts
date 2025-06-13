import { create } from "zustand";

interface EmployeeState {
  isLogin: boolean; 
  setLogin: () => void;
  setLogout: () => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  // 저장소는 객체를 반환
  // : 객체는 ()소괄호에 묶여 반환
  isLogin: false,
  setLogin: () => set({ isLogin: true }),
  setLogout: () => set({ isLogin: false })
}));