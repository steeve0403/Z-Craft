import SectionItem from './SectionItem.tsx';

interface SectionListProps<T> {
    title: string;
    items: T[];
}

const SectionList = <T extends { id: string }>({ title, items }: SectionListProps<T>) => {
    if (items.length === 0) {
        return <p>No {title} available.</p>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {items.map((item) => (
                <SectionItem key={item.id} item={item} />
            ))}
        </div>
    );
};

export default SectionList;
