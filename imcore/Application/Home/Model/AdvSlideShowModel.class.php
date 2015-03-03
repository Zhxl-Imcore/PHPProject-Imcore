<?php
namespace Home\Model;

use Think\Model;

/**
 * 广告页幻灯片
 */
class AdvSlideShowModel extends Model {
	
	// 数据表名（不包含表前缀）
	protected $tableName = 'adv_slideshow';
	
	protected $fields = array(
		'id',
		'title',
		'hyperlink',
		'photo_path',
		'order',
		'author_id',
		'create_time',
		'update_time',
		'status',
		'_pk' => 'id'
	);
	
}