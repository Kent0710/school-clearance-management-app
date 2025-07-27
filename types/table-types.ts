export interface AdminApplicantType {
    id : string;
    username : string;
    type : 'institution' | 'office';
};

export interface InstitutionAdminsType {
    username : string;
}