USE [kyw]
GO

/****** Object:  View [dbo].[qryAllWellFieldClassWSL]    Script Date: 6/19/2024 2:45:28 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


Create View [dbo].[qryAllWellFieldClassWSL] AS
SELECT dbo.tblSchool.school_id, dbo.tblSchool.sch_name, dbo.tblWellInfo.well_id, dbo.tblWellInfo.wi_wellcode, dbo.tblWellInfo.wi_wellname, dbo.tblWellInfo.wi_well_user, dbo.tblWellInfo.wi_address, dbo.tblWellInfo.wi_city, dbo.tblWellInfo.wi_state, 
                  dbo.tblWellInfo.wi_zipcode, dbo.tblCountyLookup.county_name, dbo.tblNRDLookup.nrd_name, dbo.tblWellInfo.wi_phone_well_user, dbo.tblWellInfo.wi_email_well_user, dbo.tblWellInfo.wi_well_owner, dbo.tblWellInfo.wi_installyear, 
                  dbo.tblWellInfo.wi_smelltaste, dbo.tblWellInfo.wi_smelltaste_description, dbo.tblWellInfo.wi_welldry, dbo.tblWellInfo.wi_welldry_description, dbo.tblWellInfo.wi_maintenance5yr, dbo.tblWellInfo.wi_landuse5yr, 
                  dbo.tblWellInfo.wi_numberwelluser, dbo.tblWellInfo.wi_pestmanure, dbo.tblWellInfo.wi_estlatitude, dbo.tblWellInfo.wi_estlongitude, dbo.tblWellInfo.wi_boreholediameter, dbo.tblWellInfo.wi_totaldepth, dbo.tblWellInfo.wi_waterleveldepth, 
                  dbo.tblWellInfo.wi_aquifertype, dbo.tblWellInfo.wi_aquiferclass, dbo.tblWellInfo.wi_welltype, dbo.tblWellInfo.wi_wellcasematerial, dbo.tblWellInfo.wi_datacollector, dbo.tblWellInfo.wi_observation, dbo.tblWellInfo.wi_dateentered, 
                  dbo.tblWellInfo.wi_registration_number, dbo.tblWellInfo.wi_dnr_well_id, dbo.tblFieldActivity.fa_latitude, dbo.tblFieldActivity.fa_longitude, dbo.tblFieldActivity.fa_weather, dbo.tblFieldActivity.fa_wellcovercondition, 
                  dbo.tblFieldActivity.fa_wellcoverdescription, dbo.tblFieldActivity.fa_surfacerunoff, dbo.tblFieldActivity.fa_pooling, dbo.tblFieldActivity.fa_groundwatertemp, dbo.tblFieldActivity.fa_ph, dbo.tblFieldActivity.fa_conductivity, 
                  dbo.tblFieldActivity.fa_datacollector, dbo.tblFieldActivity.fa_observation, dbo.tblFieldActivity.fa_datecollected, dbo.tblFieldActivity.fa_topography, dbo.tblClassroomLab.cl_ammonia, dbo.tblClassroomLab.cl_calciumhardness, dbo.tblClassroomLab.cl_chloride, 
                  dbo.tblClassroomLab.cl_bacteria, dbo.tblClassroomLab.cl_copper, dbo.tblClassroomLab.cl_iron, dbo.tblClassroomLab.cl_manganese, dbo.tblClassroomLab.cl_nitrate, dbo.tblClassroomLab.cl_observation, dbo.tblClassroomLab.cl_nitrite, 
                  dbo.tblClassroomLab.cl_pest_atrazine, dbo.tblClassroomLab.cl_datacollector, dbo.tblClassroomLab.cl_datecollected, dbo.tblWaterScienceLab.wsl_samplecode, dbo.tblWaterScienceLab.wsl_ph, dbo.tblWaterScienceLab.wsl_conductivity, 
                  dbo.tblWaterScienceLab.wsl_calciumhardness, dbo.tblWaterScienceLab.wsl_no3no2n, dbo.tblWaterScienceLab.wsl_nh4n, dbo.tblWaterScienceLab.wsl_bromide, dbo.tblWaterScienceLab.wsl_chloride, 
                  dbo.tblWaterScienceLab.wsl_fluoride, dbo.tblWaterScienceLab.wsl_orthophosphate, dbo.tblWaterScienceLab.wsl_sulfate, dbo.tblWaterScienceLab.wsl_arsenic, dbo.tblWaterScienceLab.wsl_chromium, 
                  dbo.tblWaterScienceLab.wsl_copper, dbo.tblWaterScienceLab.wsl_iron, dbo.tblWaterScienceLab.wsl_manganese, dbo.tblWaterScienceLab.wsl_selenium, dbo.tblWaterScienceLab.wsl_uranium, dbo.tblWaterScienceLab.wsl_zinc, 
                  dbo.tblWaterScienceLab.wsl_acetochlor, dbo.tblWaterScienceLab.wsl_alachlor, dbo.tblWaterScienceLab.wsl_atrazine, dbo.tblWaterScienceLab.wsl_butylate, dbo.tblWaterScienceLab.wsl_chlorothalonil, 
                  dbo.tblWaterScienceLab.wsl_cyanazine, dbo.tblWaterScienceLab.wsl_de_ethylatrazine, dbo.tblWaterScienceLab.wsl_de_isopropylatrazine, dbo.tblWaterScienceLab.wsl_dimethenamid, dbo.tblWaterScienceLab.wsl_EPTC, 
                  dbo.tblWaterScienceLab.wsl_metolachlor, dbo.tblWaterScienceLab.wsl_metribuzin, dbo.tblWaterScienceLab.wsl_norflurazon, dbo.tblWaterScienceLab.wsl_pendamethalin, dbo.tblWaterScienceLab.wsl_permethrin, 
                  dbo.tblWaterScienceLab.wsl_prometon, dbo.tblWaterScienceLab.wsl_propazine, dbo.tblWaterScienceLab.wsl_propachlor, dbo.tblWaterScienceLab.wsl_simazine, dbo.tblWaterScienceLab.wsl_teflurthrin, dbo.tblWaterScienceLab.wsl_trifluralin, 
                  dbo.tblWaterScienceLab.wsl_totalcoliform, dbo.tblWaterScienceLab.wsl_ecoli, dbo.tblWaterScienceLab.wsl_magnesium, dbo.tblWaterScienceLab.wsl_dateentered
FROM     dbo.tblNRDLookup INNER JOIN
                  dbo.tblSchool ON dbo.tblNRDLookup.nrd_id = dbo.tblSchool.nrd_id INNER JOIN
                  dbo.tblWellInfo ON dbo.tblSchool.school_id = dbo.tblWellInfo.school_id INNER JOIN
                  dbo.tblCountyLookup ON dbo.tblWellInfo.county_id = dbo.tblCountyLookup.county_id INNER JOIN
                  dbo.tblFieldActivity ON dbo.tblWellInfo.well_id = dbo.tblFieldActivity.well_id LEFT OUTER JOIN
                  dbo.tblClassroomLab ON dbo.tblFieldActivity.fieldactivity_id = dbo.tblClassroomLab.fieldactivity_id LEFT OUTER JOIN
                  dbo.tblWaterScienceLab ON dbo.tblFieldActivity.fieldactivity_id = dbo.tblWaterScienceLab.fieldactivity_id
				  
GO