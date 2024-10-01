use [kyw]
GO

/****** Object:  View [dbo].[qryAllWellFieldClass]    Script Date: 5/21/2024 4:55:32 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


Create View [dbo].[qryAllWellFieldClass] AS
SELECT dbo.tblSchool.sch_name, dbo.tblWellInfo.wi_wellcode, dbo.tblWellInfo.wi_wellname, dbo.tblWellInfo.wi_well_user, dbo.tblWellInfo.wi_address, dbo.tblWellInfo.wi_city, dbo.tblWellInfo.wi_state, dbo.tblWellInfo.wi_zipcode, 
                  dbo.tblCountyLookup.county_name, dbo.tblNRDLookup.nrd_name, dbo.tblWellInfo.wi_phone_well_user, dbo.tblWellInfo.wi_email_well_user, dbo.tblWellInfo.wi_well_owner, dbo.tblWellInfo.wi_installyear, dbo.tblWellInfo.wi_smelltaste, 
                  dbo.tblWellInfo.wi_smelltaste_description, dbo.tblWellInfo.wi_welldry, dbo.tblWellInfo.wi_welldry_description, dbo.tblWellInfo.wi_maintenance5yr, dbo.tblWellInfo.wi_landuse5yr, dbo.tblWellInfo.wi_numberwelluser, 
                  dbo.tblWellInfo.wi_pestmanure, dbo.tblWellInfo.wi_estlatitude, dbo.tblWellInfo.wi_estlongitude, dbo.tblWellInfo.wi_boreholediameter, dbo.tblWellInfo.wi_totaldepth, dbo.tblWellInfo.wi_waterleveldepth, dbo.tblWellInfo.wi_aquifertype, 
                  dbo.tblWellInfo.wi_aquiferclass, dbo.tblWellInfo.wi_welltype, dbo.tblWellInfo.wi_wellcasematerial, dbo.tblWellInfo.wi_dnr_well_id, dbo.tblWellInfo.wi_registration_number, dbo.tblWellInfo.wi_datacollector, dbo.tblWellInfo.wi_observation, 
                  dbo.tblWellInfo.wi_dateentered, dbo.tblFieldActivity.fa_latitude, dbo.tblFieldActivity.fa_longitude, dbo.tblFieldActivity.fa_weather, dbo.tblFieldActivity.fa_wellcovercondition, dbo.tblFieldActivity.fa_wellcoverdescription, 
                  dbo.tblFieldActivity.fa_surfacerunoff, dbo.tblFieldActivity.fa_pooling, dbo.tblFieldActivity.fa_groundwatertemp, dbo.tblFieldActivity.fa_ph, dbo.tblFieldActivity.fa_conductivity, dbo.tblFieldActivity.fa_topography, 
                  dbo.tblFieldActivity.fa_datacollector, dbo.tblFieldActivity.fa_observation, dbo.tblFieldActivity.fa_datecollected, dbo.tblClassroomLab.cl_ammonia, dbo.tblClassroomLab.cl_calciumhardness, dbo.tblClassroomLab.cl_chloride, 
                  dbo.tblClassroomLab.cl_bacteria, dbo.tblClassroomLab.cl_copper, dbo.tblClassroomLab.cl_iron, dbo.tblClassroomLab.cl_manganese, dbo.tblClassroomLab.cl_nitrate, dbo.tblClassroomLab.cl_observation, dbo.tblClassroomLab.cl_nitrite, 
                  dbo.tblClassroomLab.cl_datacollector, dbo.tblClassroomLab.cl_datecollected
FROM     dbo.tblCountyLookup RIGHT OUTER JOIN
                  dbo.tblSchool INNER JOIN
                  dbo.tblWellInfo ON dbo.tblSchool.school_id = dbo.tblWellInfo.school_id LEFT OUTER JOIN
                  dbo.tblNRDLookup ON dbo.tblWellInfo.nrd_id = dbo.tblNRDLookup.nrd_id ON dbo.tblCountyLookup.county_id = dbo.tblWellInfo.county_id LEFT OUTER JOIN
                  dbo.tblClassroomLab RIGHT OUTER JOIN
                  dbo.tblFieldActivity ON dbo.tblClassroomLab.fieldactivity_id = dbo.tblFieldActivity.fieldactivity_id ON dbo.tblWellInfo.well_id = dbo.tblFieldActivity.well_id
GO


