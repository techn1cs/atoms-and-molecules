<?php

// pawling_ps_material_entity_info
function pawling_ps_material_entity_info() {

	$entities = array();
	
	$entities['pawling_ps_material'] = array(
		'label' => t('PneumaSeal Profile Data: Material'),
		//'controller class' => 'PawlingPneumaSealMaterialController',
		'base table' => 'pawling_ps_material',
		//'load hook' => 'pawling_ps_material_load',
		'uri callback' => 'pawling_ps_material_entity_uri',
		'fieldable' => TRUE,
		'entity keys' => array(
			'id' => 'mid',
		),
		'static cache' => TRUE,
		'bundles' => array(
			'pawling_ps_material_entity' => array(
				'label' => 'PneumaSealMaterial',
				'admin' => array(
					'path' => 'admin/structure/pawling',
					'access arguments' => array('administer materials'),
				),
			),
		),
		'view modes' => array(
			'full' => array(
				'label' => t('Full Material'),
				'custom settings' => FALSE,
			),
		)
	);

	// Search integration is provided by pawling_pneumaseal.module? // TODO
	/*
	if (module_exists('search')) {
    $return['node']['view modes'] += array(
      'search_index' => array(
        'label' => t('Search index'), 
        'custom settings' => FALSE,
      ), 
      'search_result' => array(
        'label' => t('Search result'), 
        'custom settings' => FALSE,
      ),
    );
  }
	*/
	
	return $entities;
}

function pawling_ps_material_entity_load($mid, $reset = FALSE) {
	$pawling_ps_material = pawling_ps_material_load_multiple(array($mid), array(), $reset);
	return reset($pawling_ps_material);
}

function pawling_ps_material_entity_load_multiple($mids = array(), $conditions = array(), $reset = FALSE) {
	return entity_load('pawling_ps_material', $mids, $conditions, $reset);
}

function pawling_ps_material_entity_uri($material) {
	return array(
		'path' => 'pawling/' . $material->mid,
	);
}


function pawling_ps_material_entity_menu() {
	$items['admin/structure/pawling'] = array(
		'title' => 'Pawling PneumaSeal Admin',
		'description' => 'Manage PneumaSeal Profile Data',
		'page callback' => 'pawling_ps_material_info',
		'access arguments' => array('administer materials'),
	);
	
	$items['pawling/%material'] = array(
		'title callback' => 'pawling_ps_material_entity_page_title',
		'title arguments' => array(1),
		'page callback' => 'pawling_ps_material_entity_page_view',
		'page arguments' => array(1),
		'access arguments' => array('view materials'),
		'type' => MENU_CALLBACK,
	);

	return $items;
}

function pawling_ps_material_entity_permission() {
	return array(
		'administer materials' => array(
			'title' => t('Administer PneumaSeal Materials'),
			'restrict access' => TRUE,
		),
	);
}

function pawling_ps_material_info() {
	return t('Welcome to the administration page for PneumaSeal Material data!');
}


function pawling_ps_material_entity_page_title() {
	return check_plain($material->type);
}

function pawling_ps_material_entity_page_view() {
	$material->content = array();
	
	// Build fields content.
	field_attach_prepare_view('pawling_ps_material_entity', array($material->mid => $material), $view_mode);
	entity_prepare_view('pawling_ps_material_entity', array($material->mid => $material));
	$material->content += field_attach_view('pawling_ps_material_entity', $material, $view_mode);
	
	return $material->content;
}

function pawling_ps_material_entity_field_extra_fields() {
	$return = array();
	$return['pawling_ps_material_entity']['pawling_ps_material_entity'] = array(
		'form' => array(
			'material' => array(
				'label' => t('Material'),
				'description' => t('PneumaSeal Material'),
			),
		),
	);
	
	return $return;
}

/*
function pawling_ps_material_associated_pids($material_id) {
	$query = new EntityFieldQuery();
	
	$result = $query
		->entityCondition('entity_type', 'pawling_ps_profile')
		->fieldCondition('field_material_id', 'material_id', $material_id)
		->execute();
		
	return array_key_exists('pawling_ps_profile', $result) ? array(keys($result['pawling_ps_profile']) : array();
}
*/
?>