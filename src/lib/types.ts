export type createHouseDirectoryProp = {
    houseId: string,
    name: string
    lastName:string,
    phone: string,
    email?:string
}

export type PaginatedDirectories = {
    searchQuery: string,
    page: number
}
export type HouseType = {
    id: string;
    identifier: string;
    residents: ResidentType[];
};
 
// Tipo para un residente
export type ResidentType = {
    id?: string ;
    name: string;
    lastName: string | null;
    email: string | null;
    phone: string;
    houseId?: string | null;
};

export type HouseResidentsType = HouseType[];

export type DirectoryListType = {
    directoryData: HouseType[]
}

export type ResidentItemProps = {
    residents: ResidentType[]
}

export type ResidentSideSheetProps = {
    identifier: string
    residents: ResidentType[]
}

export type queryGetDirectoriesDataProps = {
    pageParam: number,
    search?:string | null
}


// PROFILE TYPES

export type  profileType = {
    id: number;
    name: string | null;
    userId: number;
    lastName: string | null;
}


// RESIDENT HOUSE TYPES
export type addHouseResident = {
    identifier: string 
    name: string
    lastName:string;
    email?: string | undefined,
    phone: string;
}


// LOGICA OPCIONAL PARA CAMPOS
type ExampleType = {
    name:string
} &({
    gender: "male"
    salary:  number
} | {
    gender: "female"
    weight: number
})
