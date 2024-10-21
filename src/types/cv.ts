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
    skills: string[];
    languages: Language[];

    createdAt: string;
    updatedAt: string;
}

export interface Experience {
    id: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    fields: string;
    graduationDate: string;
}

export interface Language {
    name: string;
    proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Fluent' | 'Native';
}