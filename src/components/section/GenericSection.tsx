import React from 'react';

interface GenericSectionProps<T> {
    items: T[];
    title: string;
    cvId: string;
    renderItem: (item: T) => React.ReactNode;
}

/**
 * A generic section component that can be used to render any list of items for a CV.
 * @param items - The items to display in the section.
 * @param title - The title of the section.
 * @param cvId - The ID of the CV to filter the items by.
 * @param renderItem - A function to render each individual item.
 */
const GenericSection = <T extends { cvId: string; id: string }>({
                                                                    items,
                                                                    title,
                                                                    cvId,
                                                                    renderItem
                                                                }: GenericSectionProps<T>) => {
    const filteredItems = items.filter((item) => item.cvId === cvId);

    if (filteredItems.length === 0) {
        return <p>No {title} available.</p>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {filteredItems.map((item) => (
                <div key={item.id}>{renderItem(item)}</div>
            ))}
        </div>
    );
};

export default GenericSection;