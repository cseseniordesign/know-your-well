import { DataSource } from 'typeorm';
import { TblWellInfo } from './entities/TblWellInfo';
import { Sysdiagrams } from './entities/Sysdiagrams';
import { TblClassroom } from './entities/TblClassroom';
import { TblClassroomLab } from './entities/TblClassroomLab';
import { TblCountyLookup } from './entities/TblCountyLookup';
import { TblFieldActivity } from './entities/TblFieldActivity';
import { TblLandFeature } from './entities/TblLandFeature';
import { TblNrdLookup } from './entities/TblNrdLookup';
import { TblSchool } from './entities/TblSchool';
import { TblWaterScienceLab } from './entities/TblWaterScienceLab';
import { TblWellFeature } from './entities/TblWellFeature';
import { TblWellForm } from './entities/TblWellForm';

export const AppDataSource = new DataSource({
    type: 'mssql',
    host: 'localhost',
    username: 'kywAdmin',
    password: 'Snickers9!',
    database: 'kyw',
    synchronize: false,
    logging: true,
    entities: [TblWellInfo, Sysdiagrams, TblClassroom, TblClassroomLab, 
        TblCountyLookup, TblFieldActivity, TblLandFeature, TblNrdLookup, 
        TblSchool, TblWaterScienceLab, TblWellFeature, TblWellForm],
    subscribers: [],
    migrations: [],
    options: {"trustServerCertificate": true}   

}).initialize();
