export interface CV {
    id: string;

    generalInfo: GeneralInfo[];
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    languages: Language[];

    createdAt: string;
    updatedAt: string;
}

export interface GeneralInfo {
    id: string;
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
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    graduationDate: string;
    description?: string;
}

export interface Language {
    id: string;
    name: string;
    proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Fluent' | 'Native';
}

export interface Skill {
    id: string;
    name: string;
    proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Fluent' | 'Native';
}
