<?php

	class MainController extends CI_Controller {

		public function __construct() {
			parent::__construct();
		}

		public function index() {
			$data = 'Witaj';
			$this->load->view('json', array('data' => $data));
		}

		public function getLanguageCode() {
			$this->load->view('json', array('data' => 'pl'));
		}

		public function getMenuPositions() {
			$data = array(
				array(
					'universalName' => 'aboutCompany',
					'anchor' => site_url().'/mainController/pages',
					'page' => 'aboutCompany',
				), 
				array(
					'universalName' => 'contact',
					'anchor' => site_url().'/mainController/pages',
					'page' => 'contact',
				),
				array(
					'universalName' => 'offer',
					'anchor' => site_url().'/mainController/pages',
					'page' => 'offer',
				),
			);
			$this->load->view('json', array('data' => $data));
		}

		public function pages() {
			$page = $this->input->get('page');
			$data;
			switch ($page) {
				default:
					$data = '<h1>Hello World</h1>';
			}
			$this->load->view('json', array('data' => $data));
		}

	}