import { assert } from "chai";
import { ImportMock, MockManager } from 'ts-mock-imports';
import { ServiceLanguage } from '../../Common/Types/ServiceLanguage';
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

            const bookletList = await hymnsProvider.getBookletList(ServiceLanguage.English);
            Validators.validateArray(bookletList);
            bookletList.length.should.be.eql(3);
            bookletList.forEach((booklet) => Validators.validateBooklet(booklet));
        });

        it("should get booklets with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getBookletList', []);

            const bookletList = await hymnsProvider.getBookletList(ServiceLanguage.English);
            Validators.validateArray(bookletList, true);
        });

        it("should get all booklets English results", async () => {
            // Setup mocked result
            mockManager.mock('getBookletList', SqlDataProviderMock.getDbBookletList());

            const bookletList = await hymnsProvider.getBookletList(ServiceLanguage.English);
            Validators.validateArray(bookletList);
            bookletList.length.should.be.eql(3);
            bookletList.forEach((booklet) => Validators.validateBooklet(booklet));
            assert.equal(bookletList[0].name, SqlDataProviderMock.getDbBookletList()[0].Name);
            assert.equal(bookletList[0].summary, SqlDataProviderMock.getDbBookletList()[0].Summary);
        });

        it("should get all booklets Arabic results", async () => {
            // Setup mocked result
            mockManager.mock('getBookletList', SqlDataProviderMock.getDbBookletList());

            const bookletList = await hymnsProvider.getBookletList(ServiceLanguage.Arabic);
            Validators.validateArray(bookletList);
            bookletList.length.should.be.eql(3);
            bookletList.forEach((booklet) => Validators.validateBooklet(booklet));
            assert.equal(bookletList[0].name, SqlDataProviderMock.getDbBookletList()[0].Name_Arabic);
            assert.equal(bookletList[0].summary, SqlDataProviderMock.getDbBookletList()[0].Summary_Arabic);
        });
    });

    describe("A single booklet", () => {
        it("should get a single booklet", async () => {
            // Setup mocked result
            mockManager.mock('getBooklet', SqlDataProviderMock.getDbBooklet());

            const booklet = await hymnsProvider.getBooklet(ServiceLanguage.English, "bookletId");
            Validators.validateObject(booklet);
            Validators.validateBooklet(booklet);
        });

        it("should have correct db to contract booklet mapping", async () => {
            // Setup mocked result
            mockManager.mock('getBooklet', SqlDataProviderMock.getDbBooklet());

            const bookletDb = SqlDataProviderMock.getDbBooklet();
            const booklet = await hymnsProvider.getBooklet(ServiceLanguage.English, "bookletId");

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

        it("should get a single booklet in English", async () => {
            // Setup mocked result
            mockManager.mock('getBooklet', SqlDataProviderMock.getDbBooklet());

            const booklet = await hymnsProvider.getBooklet(ServiceLanguage.English, "bookletId");
            Validators.validateObject(booklet);
            Validators.validateBooklet(booklet);
            assert.equal(booklet.name, SqlDataProviderMock.getDbBooklet().Name);
            assert.equal(booklet.summary, SqlDataProviderMock.getDbBooklet().Summary);
        });

        it("should get a single booklet in Arabic", async () => {
            // Setup mocked result
            mockManager.mock('getBooklet', SqlDataProviderMock.getDbBooklet());

            const booklet = await hymnsProvider.getBooklet(ServiceLanguage.Arabic, "bookletId");
            Validators.validateObject(booklet);
            Validators.validateBooklet(booklet);
            assert.equal(booklet.name, SqlDataProviderMock.getDbBooklet().Name_Arabic);
            assert.equal(booklet.summary, SqlDataProviderMock.getDbBooklet().Summary_Arabic);
        });
    });
});
