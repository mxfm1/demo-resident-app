'use server'

import AdminHeadWrapper from "@/components/admin-page-header"
import DirectoryList from "./_components/directory-list"

export default async function DirectoryPage(){
    return (
        <AdminHeadWrapper title="Directorio Condominio">
            <DirectoryList />
        </AdminHeadWrapper>
    )
}