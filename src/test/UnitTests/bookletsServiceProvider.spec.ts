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

    it("should have correct db to contract booklet mapping", async () => {
        // Setup mocked result
        mockManager.mock('getBooklet', SqlDataProviderMock.getDbBooklet());

        const bookletDb = SqlDataProviderMock.getDbBooklet();
        const booklet = await hymnsProvider.getBooklet("bookletId");

        // Validate that the contract was mapped out correctly from db results
        booklet.name.should.be.equal(bookletDb.Name);
        booklet.summary.should.be.equal(bookletDb.Summary);
        booklet.order.should.be.equal(bookletDb.Booklet_Order);
        booklet.sourcePath.should.be.equal(bookletDb.Source_Path);
        booklet.displayPath.should.be.equal(bookletDb.Display_Path);
        booklet.printPath.should.be.equal(bookletDb.Print_Path);
        booklet.thumbnailPath.should.be.equal(bookletDb.Thumbnail);
        booklet.fullPicturePath.should.be.equal(bookletDb.Full_Picture);
        booklet.releaseDate.should.be.equal(bookletDb.Release_Date);
    });
});
