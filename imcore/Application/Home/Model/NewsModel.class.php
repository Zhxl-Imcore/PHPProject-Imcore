<?php
namespace Home\Model;

use Think\Model;

/**
 * 新闻模块
 * @author zhxl
 *
 */
class NewsModel extends Model {
	
	/**
	 * 表字段
	 * @var unknown
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



