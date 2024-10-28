export interface CV {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
}

export interface GeneralInfo {
    id: string;
    cvId: string;
    title: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
}

export interface Experience {
    id: string;
    cvId: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Education {
    id: string;
    cvId: string;
    institution: string;
    degree: string;
    field: string;
    graduationDate: string;
    description?: string;
}

export interface Skill {
    id: string;
    cvId: string;
    name: string;
    proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Fluent' | 'Native';
}

export interface Language {
    id: string;
    cvId: string;
    name: string;
    proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Fluent' | 'Native';
}

export interface Template {
    id: string;
    title: string;
}

export interface Section {
    cvId: string;
    isEditable?: boolean;
}