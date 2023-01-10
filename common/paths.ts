import { config } from 'hardhat';

interface Path {
    fileName: string;
    location: string;
    fullPath: string;
}

export const deploymentLogsPath: Path = {
    fileName: 'deployments.logs',
    location: config.paths.root + '/logs/deployment/',
    fullPath: config.paths.root + '/logs/deployment/deployments.logs'
};

export const deploymentErrorsPath: Path = {
    fileName: 'errors.logs',
    location: config.paths.root + '/logs/deployment/',
    fullPath: config.paths.root + '/logs/deployment/errors.logs'
};

export const testErrorsPath: Path = {
    fileName: 'errors.logs',
    location: config.paths.root + '/logs/test/',
    fullPath: config.paths.root + '/logs/test/errors.logs'
};

export const globalParamsPath: Path = {
    fileName: 'publicNetworks.json',
    location: config.paths.root + '/global/',
    fullPath: config.paths.root + '/global/publicNetworks.json'
};

export const appParamsPath: Path = {
    fileName: 'contracts.ts',
    location: '../../../client/src/components/common/params/',
    fullPath: '../../../client/src/components/common/params/contracts.ts'
};