import moment from "moment"

export const formatDate = (date?: string): string => {
    
    return moment(date, "YYYY-MM-DD").format("DD MMM, YYYY")
}