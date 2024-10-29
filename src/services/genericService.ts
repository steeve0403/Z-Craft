import {Table} from 'dexie';
import {handleServiceError} from "./utilsService";

/**
 * Class to create a generic service for interacting with Dexie tables.
 * @template T - Type of the records in the table
 */
export class GenericService<T extends { id: string }> {
    private table: Table<T, string>;

    /**
     * Constructor for the GenericService.
     * @param {Table<T, string>} table - The Dexie table instance to create the service for
     */
    constructor(table: Table<T, string>) {
        this.table = table;
    }

    /**
     * Retrieves all records from the specified table.
     * @returns {Promise<T[]>} - Array of records
     */
    async getAll(): Promise<T[]> {
        return handleServiceError(() => this.table.toArray(), "Failed to fetch records from the table");
    }

    /**
     * Retrieves a record by its ID.
     * @param {string} id - Unique identifier of the record.
     * @returns {Promise<T | undefined>} - The record if found
     */
    async getById(id: string): Promise<T | undefined> {
        return handleServiceError(() => this.table.get(id), `Failed to fetch record with ID: ${id}`);
    }

    /**
     * Adds a new record to the table, checking for duplicates.
     * @param {T} record - The record to add.
     * @returns {Promise<void>} - A promise that resolves when the record is added
     */
    async add(record: T): Promise<void> {
        return handleServiceError(async () => {
            const existingRecord = await this.table.get(record.id);
            if (existingRecord) throw new Error("Record with this ID already exists.");
            await this.table.add(record);
        }, "Failed to add the record to the table");
    }

    /**
     * Inserts or updates a record in the table (upsert).
     * @param {T} record - The record to upsert.
     * @returns {Promise<void>} - A promise that resolves when the record is upserted
     */
    async upsert(record: T): Promise<void> {
        return handleServiceError(async () => {
            await this.table.put(record);
        }, "Failed to upsert record in the database");
    }

    /**
     * Deletes a record by its ID.
     * @param {string} id - Unique identifier of the record.
     * @returns {Promise<void>} - A promise that resolves when the record is deleted
     */
    async delete(id: string): Promise<void> {
        return handleServiceError(() => this.table.delete(id), `Failed to delete record with ID: ${id}`);
    }
}

