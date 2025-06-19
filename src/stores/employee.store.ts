import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ApprovalStatus = "PENDING" | "APPROVED" | "DENIED";
type EmployeeStatus = "EMPLOYED" | "EXITED";

export type Employee = {
  employeeId: number,
  employeeNumber: number;
  employeeName: string;
  branchId: number;
  branchName: string;
  positionId: number;
  positionName: string;
  authorityId: number;
  authorityName: string;
  email: string
  phoneNumber: string;
  birthDate: string;
  status: EmployeeStatus
  isApproved: ApprovalStatus
  createdAt: Date
};

interface EmployeeStore {
  employee: Employee | null;
  setEmployee: (employee: Employee) => void;
  clearEmployee: () => void;

  isLogin: boolean;
  setLogin: () => void;
  setLogout: () => void;
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set) => ({
      employee: null,
      isLogin: false,

      setEmployee: (employee) => set({ employee }),
      clearEmployee: () => set({ employee: null }),

      setLogin: () => set({ isLogin: true }),
      setLogout: () => set({ isLogin: false, employee: null }),
    }),
    {
      name: "employee-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
