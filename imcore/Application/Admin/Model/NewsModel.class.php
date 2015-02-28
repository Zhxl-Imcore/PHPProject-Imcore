<?php

namespace Admin\Model;

use Think\Model;

/**
 * 果核动态
 * @author zhxl
 *
 */
class NewsModel extends Model {
	
	/**
	 * 字段信息
	 */
	protected $fields = array(
		'id',
		'title',
		'content',
		'image_ids',
		'publisher',
		'publish_time',
		'is_stick',
		'status'
	);
}




