<?php
namespace Admin\Model;

use Think\Model\RelationModel;
/**
 * 讲师团队
 */
class TeacherModel extends RelationModel {
	
	protected $fields = array(
		'id',
		'title',
		'job',
		'introduce',
		'photo_path',
		'student_hope',
		'teach_idea',
		'published_book',
		'auth_id',
		'create_time',
		'status'
	);
	
	/**
	 * 自动完成：自动给字段注入值,这里必须调用create()方法才能生效
	 */
	protected $_auto = array(
		array('create_time','date',self::MODEL_INSERT,'function',array('Y-m-d H:i:s')),
		array('update_time','date',self::MODEL_BOTH,'function',array('Y-m-d H:i:s')),
	);
	
	/**
	 * 模型关联
	 */
	protected $_link = array(
		'User' => array(
			'mapping_type' => self::BELONGS_TO,
			'class_name' => 'User',
			'mapping_name' => 'user',
			'foreign_key' => 'author_id',
			'mapping_fields' => array(
				'account'
			),
		),
	);
	
}








