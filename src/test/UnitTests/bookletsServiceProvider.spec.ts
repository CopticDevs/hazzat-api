import { ImportMock, MockManager } from 'ts-mock-imports';
import * as SqlDataProviderModule from '../../Providers/DataProviders/SqlDataProvider/SqlDataProvider';
import { HymnsServiceProvider } from "../../Providers/ServiceProviders/HymnsServiceProvider";
import { IHymnsServiceProvider } from "../../Providers/ServiceProviders/IHymnsServiceProvider";
import { SqlDataProviderMock } from "../Helpers/SqlDataProviderMock";
import { Validators } from "../Helpers/Validators";

process.env.NODE_ENV = "test";

describe("BookletsService Provider Unit Tests", () => {
    let mockManager: MockManager<SqlDataProviderModule.SqlDataProvider>;
    let hymnsProvider: IHymnsServiceProvider;

    beforeEach("Mock out Booklets Data Provider", () => {
        // Setup Mocking for SqlDataProvider
        mockManager = ImportMock.mockClass(SqlDataProviderModule, 'SqlDataProvider');

        // Create the service
        hymnsProvider = new HymnsServiceProvider(mockManager.getMockInstance());
    });

    afterEach("Restore dependencies", () => {
        mockManager.restore();
    });

    describe("All Booklets", () => {
        it("should get all booklets results", async () => {
            // Setup mocked result
            mockManager.mock('getBookletList', SqlDataProviderMock.getDbBookletList());

            const bookletList = await hymnsProvider.getBookletList();
            Validators.validateArray(bookletList);
            bookletList.length.should.be.eql(3);
            bookletList.forEach((booklet) => Validators.validateBooklet(booklet));
        });

        it("should get booklets with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getBookletList', []);

            const bookletList = await hymnsProvider.getBookletList();
            Validators.validateArray(bookletList, true);
        });
    });

    describe("A single booklet", () => {
        it("should get a single booklet", async () => {
            // Setup mocked result
            mockManager.mock('getBooklet', SqlDataProviderMock.getDbBooklet());

            const booklet = await hymnsProvider.getBooklet("bookletId");
            Validators.validateObject(booklet);
            Validators.validateBooklet(booklet);
        });
    });
});
