import React from 'react';

interface GenericSectionListProps<T> {
    title: string;
    items: T[];
    renderItem: (item: T) => React.ReactNode;
}

const GenericSectionList = <T extends { id: string }>({
                                                          title,
                                                          items,
                                                          renderItem,
                                                      }: GenericSectionListProps<T>) => {
    if (items.length === 0) {
        return <p>No {title} available.</p>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {items.map((item) => (
                <div key={item.id}>{renderItem(item)}</div>
            ))}
        </div>
    );
};

export default GenericSectionList;
