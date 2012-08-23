<?php
/*

// TODO
---------------

=> Make material type an indexed separate table
		i.e. CR, NBR, NR, VMQ become FK to material_type
		Also, color.
		i.e. Black, Red, Clear become FK to material_color

=> Make datasheet property a FK to the "uploaded files" table... 
		Figure out how to make the upload file widget in the material editor upload to a specific location.

=> Remember to have drupal store the 'type' of connection for material as a field on the profile
		


*/

/*
	Return all table schema descriptors.
	Implements hook_schema()
*/
function pawling_ps_material_entity_schema() {
	$schema['pawling_ps_material'] = _construct_material_schema();
	// $schema['pawling_ps_air_connector_entity_schema'] = _construct_air_connector_schema();
	// ...
	
	return $schema;
}

// Construct the table schema for Material data.
function _construct_material_schema() {
	return array(
		'description' => 'The base table for Pneuma-Seal Material data.',
		'fields' => array(
			'mid' => array(
				'description' => 'The primary index for a material.',
				'type' => 'int',
				'unsigned' => TRUE,
				'not null' => TRUE,
				'default' => 0,
			),
			'type' => array(
        'description' => 'The "type" of this material.',//'The {material_type} of this material.', 
        'type' => 'varchar', 
        'length' => 8, 
        'not null' => TRUE, 
        'default' => '',
      ), 
      'color' => array(
        'description' => 'The color of this material.', 
        'type' => 'varchar', 
        'length' => 32, 
        'not null' => TRUE, 
        'default' => '',
      ),
			'description' => array(
				'description' => 'The description of this material.',
				'type' => 'varchar',
				'length' => 255,
				'not null' => TRUE,
				'default' => '',
			),
			'datasheet' => array(
				'description' => 'The associated datasheet file for this material.',
				'type' => 'varchar',
				'length' => 32, // this is a guess... current are just numbers/letters small like 47A09
				'not null' => TRUE,
				'default' => '',
			),
    ), 
    'primary key' => array('mid'),
	);
}




/*
	$schema['ps_seals'] = array(
		'description' => 'Test of Entity Use',
		'fields' => array(
			'ps_id'	=> array(
				'description'	=> 'Primary Key: Test Seal Id',
				'type'				=> 'int',
				'size'				=> 'big',
				'not null'		=> FALSE,
			),
			'ps_group'	=> array(
				'description'	=> 'Profile Group',
				'type'				=> 'varchar',
				'size'				=> 8,
				'not null'		=> FALSE,
			),
			'ps_type'	=> array(
				'description'	=> 'Profile Type',
				'type'				=> 'varchar',
				'size'				=> 8,
				'not null'		=> FALSE,
			),
			'ps_num'	=> array(
				'description'	=> 'Profile Unique Number',
				'type'				=> 'varchar',
				'size'				=> 8,
				'not null'		=> FALSE,
			),
			'ps_desc'	=> array(
				'description'	=> 'Description of Profile',
				'type'				=> 'varchar',
				'size'				=> 255,
				'not null'		=> TRUE,
			)
		),
		'primary key' => array('ps_id')
		//'indexes'			=>
	);
	
	return $schema;
}
*/
?>