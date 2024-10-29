
interface SectionItemProps<T> {
    item: T;
}

const SectionItem = <T extends { id: string }>({ item }: SectionItemProps<T>) => {
    // Cette partie doit être adaptée à chaque type de section
    return (
        <div>
            {/* Utiliser des propriétés spécifiques à chaque type ici */}
            <pre>{JSON.stringify(item, null, 2)}</pre>
        </div>
    );
};

export default SectionItem;
