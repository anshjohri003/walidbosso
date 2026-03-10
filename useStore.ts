import { create } from 'zustand'
import { mockData as initialMockData } from '@/lib/mock-data'

type Student = {
  id: string
  name: string
  grade: string
  gender: string
  contact: string
  status: string
}

type Teacher = {
  id: string
  name: string
  subject: string
  type: string
  status: string
}

type Fee = {
  id: string
  student: string
  grade: string
  amount: number
  dueDate: string
  status: string
}

type Book = {
  id: string
  title: string
  author: string
  category: string
  total: number
  issued: number
  available: number
}

type Notice = {
  id: string
  title: string
  date: string
  type: string
  audience: string
  content: string
}

interface StoreState {
  // Admin Students
  students: Student[]
  addStudent: (student: Student) => void
  updateStudentStatus: (id: string, status: string) => void
  deleteStudent: (id: string) => void

  // Admin Teachers
  teachers: Teacher[]
  addTeacher: (teacher: Teacher) => void
  updateTeacherStatus: (id: string, status: string) => void
  deleteTeacher: (id: string) => void

  // Admin Fees
  fees: Fee[]
  addFeePayment: (fee: Fee) => void

  // Admin Notices
  notices: Notice[]
  addNotice: (notice: Notice) => void
  deleteNotice: (id: string) => void

  // Admin Library
  books: Book[]
  addBook: (book: Book) => void
  deleteBook: (id: string) => void

  // Stats derivation
  getOverviewStats: () => {
    totalStudents: number
    totalTeachers: number
    totalClasses: number
    monthlyRevenue: number
    attendanceRate: number
  }
}

export const useStore = create<StoreState>((set, get) => ({
  students: initialMockData.admin.students,
  addStudent: (student) => set((state) => ({ students: [student, ...state.students] })),
  updateStudentStatus: (id, status) => set((state) => ({
    students: state.students.map(s => s.id === id ? { ...s, status } : s)
  })),
  deleteStudent: (id) => set((state) => ({
    students: state.students.filter(s => s.id !== id)
  })),

  teachers: initialMockData.admin.teachers,
  addTeacher: (teacher) => set((state) => ({ teachers: [teacher, ...state.teachers] })),
  updateTeacherStatus: (id, status) => set((state) => ({
    teachers: state.teachers.map(t => t.id === id ? { ...t, status } : t)
  })),
  deleteTeacher: (id) => set((state) => ({
    teachers: state.teachers.filter(t => t.id !== id)
  })),

  fees: initialMockData.admin.fees,
  addFeePayment: (fee) => set((state) => ({ fees: [fee, ...state.fees] })),

  notices: [
    { id: "NOT001", title: "Diwali Vacation Schedule", date: "Oct 20, 2026", type: "Holiday", audience: "All", content: "The school will remain closed for Diwali vacations from Oct 28 to Nov 5. Classes resume on Nov 6." },
    { id: "NOT002", title: "Term 1 Examination Timetable", date: "Oct 15, 2026", type: "Academic", audience: "Students", content: "The detailed schedule for the upcoming Term 1 exams has been published to the student portal." },
    { id: "NOT003", title: "Staff Development Workshop", date: "Oct 10, 2026", type: "Event", audience: "Teachers", content: "Mandatory NEP 2020 orientation workshop for all teaching staff this Saturday in the main auditorium." },
    { id: "NOT004", title: "Fee Payment Deadline", date: "Oct 05, 2026", type: "Administrative", audience: "Parents", content: "Gentle reminder to clear all pending Term 2 dues by the 15th of this month to avoid late fees." }
  ],
  addNotice: (notice) => set((state) => ({ notices: [notice, ...state.notices] })),
  deleteNotice: (id) => set((state) => ({ notices: state.notices.filter(n => n.id !== id) })),

  books: [
    { id: "LIB001", title: "Concepts of Physics Vol 1", author: "H.C. Verma", category: "Science", total: 45, issued: 42, available: 3 },
    { id: "LIB002", title: "Mathematics Class 12", author: "R.D. Sharma", category: "Mathematics", total: 60, issued: 55, available: 5 },
    { id: "LIB003", title: "The Discovery of India", author: "Jawaharlal Nehru", category: "History", total: 15, issued: 12, available: 3 },
    { id: "LIB004", title: "Wings of Fire", author: "A.P.J. Abdul Kalam", category: "Biography", total: 20, issued: 20, available: 0 },
    { id: "LIB005", title: "Computer Science with Python", author: "Sumita Arora", category: "Technology", total: 30, issued: 15, available: 15 },
  ],
  addBook: (book) => set((state) => ({ books: [book, ...state.books] })),
  deleteBook: (id) => set((state) => ({ books: state.books.filter(b => b.id !== id) })),

  getOverviewStats: () => {
    const state = get()
    // Dynamic calculation from state
    const totalStudents = state.students.length + 2538 // Add large base for realism
    const totalTeachers = state.teachers.length + 151
    const totalClasses = 86
    const calculatedRevenue = state.fees.filter(f => f.status === "Paid").reduce((acc, f) => acc + f.amount, 0) + 10450000 // Base + dynamic
    const attendanceRate = 94.5

    return { totalStudents, totalTeachers, totalClasses, monthlyRevenue: calculatedRevenue, attendanceRate }
  }
}))
