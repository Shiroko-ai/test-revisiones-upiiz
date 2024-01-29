import CenterContainer from "@/app/components/containers/CenterContainer"
import Table from "@/app/components/ui/Table"

export default async function AcceptUsersPage() {
    const response = await fetch("http://localhost:3000/api/pending-users")
    const data = await response.json()
    console.log(data)
    return (
        <>
            <CenterContainer>
                <Table data={data.data} />
            </CenterContainer>
        </>
    )
}