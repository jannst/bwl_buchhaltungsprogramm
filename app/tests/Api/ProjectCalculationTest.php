<?php

namespace App\Tests\Api;


use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;

class ProjectCalculationTest extends ApiTestCase
{

    public function testCalculation()
    {
        $respose = static::createClient()->request('GET', '/api/project_calculation/1');
        //static::setResult($respose);


        //$this->assertContains('6cdabac7c19fbd3ee11ae61c6fb88dbc', $respose->getContent());

        //TODO ändere project/pump/properties (post) berechne erneut und validiere, dass sich hash ändert
    }
}
