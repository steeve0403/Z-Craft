export interface CV {
    id: string;
    title: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    summary: string;

    experience: Experience[];
    education: Education[];
    skills: Skill[];
    languages: Language[];

    createdAt: string;
    updatedAt: string;
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
    name: string;
    proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Fluent' | 'Native';
}

export interface Skill {
    name: string;
    proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Fluent' | 'Native';
}
