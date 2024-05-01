import { patientType } from "./patientType"

export type tableType = {
    setViewModalVisible: (a: boolean) => void,
    setEditModalVisible: (a: boolean) => void,
    setDeleteModalVisible: (a: boolean) => void,
    setCurrentId: (a?: string) => void
    data: patientType[]
}