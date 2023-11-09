interface DashboardInfoError {
    id? : string | null
    code? : string | null
    message? : string | null
    cause? : string | null
    expection? : string | null
}

interface DashboardInfoList {
    y_value?: number
    comp_title?: string
    comp_name?: string
    w_value?: number
    h_value?: number
    comp_id?: number
    key_value?: string
    x_value?: number
}

export interface DashboardInfoComp {
    success?: boolean
    total?: number
    limit?: number
    start?: number
    error?: DashboardInfoError
    map?: {}
    list?: DashboardInfoList[]
    object?: null
}