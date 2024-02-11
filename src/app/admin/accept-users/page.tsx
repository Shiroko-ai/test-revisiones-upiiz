"use client"
import CenterContainer from "@/app/components/containers/CenterContainer"
import Table from "@/app/components/ui/Table"
import { ButtonType } from "../../../../types/types"
import { useState } from "react"
import { useEffect } from "react"
import Navbar from "@/app/components/ui/Navbar"
const actions = [
    {
        value: "Aceptar",
        onClick: () => {
            console.log("Accept")
        },
        type: "button" as ButtonType
    },
    {
        value: "Rechazar",
        onClick: () => {
            console.log("Reject")
        },
        type: "button" as ButtonType
    }
]
export default function AcceptUsersPage() {
    const [users, setUsers] = useState()
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("http://localhost:3000/api/pending-users")
            const data = await response.json()
            setUsers(data.data)
        }
        fetchUsers()
    }, [])
    return (
        <>
            <Navbar />
            <CenterContainer>
                <Table data={users} actions={actions} name="Alumnos" />
            </CenterContainer>
        </>
    )
}