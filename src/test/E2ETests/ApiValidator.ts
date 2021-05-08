interface ResourcePart {
    typeName: string;
    value: string;
}

interface ApiTestCase {
    description: string;
    resourceId: string;
    partUnderTest: string;
    testCase: TestCaseType;
}

export enum TestCaseType {
    Negative,
    NonInteger,
    NonExisting
}

export class ApiValidator {
    private parts: ResourcePart[] = [];

    public withPart(resourcePart: ResourcePart): ApiValidator {
        this.parts.push(resourcePart);
        return this;
    }

    public reset(): void {
        this.parts = [];
    }

    private generateResourceIdForTest(indexUnderTest: number, testValue: string): string {
        let resourceId = "";
        this.parts.forEach((resourcePart, j) => {
            const valueUsed = (indexUnderTest === j) ? testValue : resourcePart.value;
            resourceId += `/${resourcePart.typeName}/${valueUsed}`;
        });
        return resourceId;
    }

    public generate(): ApiTestCase[] {
        if (this.parts.length === 0) {
            throw new Error("Invalid test setup.  Nothing to validate.");
        }

        const cases: ApiTestCase[] = [];

        this.parts.forEach((partUnderTest, i) => {
            cases.push({
                description: `should return a 404 for negative ${partUnderTest.typeName} ids`,
                resourceId: this.generateResourceIdForTest(i, "-1"),
                partUnderTest: partUnderTest.typeName,
                testCase: TestCaseType.Negative
            });
            cases.push({
                description: `should return a 404 for non integer ${partUnderTest.typeName} ids`,
                resourceId: this.generateResourceIdForTest(i, "badInput"),
                partUnderTest: partUnderTest.typeName,
                testCase: TestCaseType.NonInteger
            });
            cases.push({
                description: `should return a 404 for non existing ${partUnderTest.typeName} ids`,
                resourceId: this.generateResourceIdForTest(i, "99999"),
                partUnderTest: partUnderTest.typeName,
                testCase: TestCaseType.NonExisting
            });
        });

        return cases;
    }
}
