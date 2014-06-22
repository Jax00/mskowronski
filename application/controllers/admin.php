<?php

	class Admin extends CI_Controller {

		public function __construct() {
			parent::__construct();
			$this->load->library('session');
			/*if ($this->session->userdata('logged') == false) {
				die('You are not logged in');
			}*/
		}

		public function index() {
			$data = array(
				'title' => 'Title',
				'main_page_url' => $this->config->item('admin_main_page_url'),
				'additional_script' => array(
					base_url().'scripts/admin_tools.js',
				),
				'additional_style' => array(
					base_url().'styles/admin_style.css',
				),
				'dictionary_url' => base_url().'scripts/dictionaries/dictionary_pl.js',
			);
			$this->load->view('admin_welcome', $data);
		}

		public function adminMainPage() {
			$data = array(
				'language' => 'pl',
				'menu' => array(
					array(
						'universalName' => 'ADM_PAGE_LIST',
						'anchor' => $this->config->item('admin_controller').'/pages/',
						'page' => 'page1',
					),
					array(
						'universalName' => 'ADM_MENU_POS_LIST',
						'anchor' => $this->config->item('admin_controller').'/pages/',
						'page' => 'page2',
					),
					array(
						'universalName' => 'ADM_LOGOUT',
						'anchor' => $this->config->item('admin_controller').'/pages/',
						'page' => 'logout',
					),
				),
				'page' => array(
					'title' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
					'content' => 'Vestibulum sed diam. Aliquam ut massa in ante pellentesque viverra. Phasellus rhoncus blandit urna. Ut interdum ligula sed tellus. Vivamus accumsan, dui eu consequat molestie, erat nisi bibendum velit, id vulputate dui risus quis ante. Vestibulum sed diam. Aliquam ut massa in ante pellentesque viverra. Phasellus rhoncus blandit urna. Ut interdum ligula sed tellus. Vivamus accumsan, dui eu consequat molestie, erat nisi bibendum velit, id vulputate dui risus quis ante. Vestibulum sed diam. Aliquam ut massa in ante pellentesque viverra. Phasellus rhoncus blandit urna. Ut interdum ligula sed tellus. Vivamus accumsan, dui eu consequat molestie, erat nisi bibendum velit, id vulputate dui risus quis ante. ',
				),
				'images' => array(
					array(
						'title' => 'Obrazek Testowy1',
						'description' => 'Opis1',
						'thumbURL' => 'thumb1',
						'bigURL' => 'big1',
					),
					array(
						'title' => 'Obrazek Testowy2',
						'description' => 'Opis2',
						'thumbURL' => 'thumb2',
						'bigURL' => 'big2',
					),
				),
				'header' => '<h1>Main Page</h1>',
				'footer' => '<h6>Witaj</h6>',
			);
			$this->load->view('json', array('data' => $data));
		}

		public function pages() {
			$page = $this->input->get('page');
			switch ($page) {
				case 'logout': 
					$this->session->unset_userdata('logged');
					break;
				default:
					break;
			}
		}

	}