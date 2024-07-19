import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DaysJSDateProvider } from './DateProvider/implemantations/DayJsDateProvider';

import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvaider } from './MailProvider/implements/EtherealMailProvider';

import { S3StorageProvider } from './StorageProvider/Implements/S3StorageProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';

container.registerSingleton<IDateProvider>(
    "DaysJSDateProvider",
    DaysJSDateProvider
)

container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvaider()
)

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    S3StorageProvider
)
