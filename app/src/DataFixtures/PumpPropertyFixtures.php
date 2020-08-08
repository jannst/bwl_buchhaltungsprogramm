<?php

namespace App\DataFixtures;

use App\Entity\PumpProperty;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class PumpPropertyFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {

        $property1 = new PumpProperty();
        $property1->setDateCreated(DateTime::createFromFormat("Y-m-d H:i:s", '2000-01-05 15:16:17'));
        $property1->setPump($this->getReference(PumpFixtures::PUMP_2));
        $property1->setPropertyType("weight_mt");
        $property1->setPropertyValue("300");

        $manager->persist($property1);

        $property2 = new PumpProperty();
        $property2->setDateCreated(DateTime::createFromFormat("Y-m-d H:i:s", '2017-02-15 15:16:17'));
        $property2->setPump($this->getReference(PumpFixtures::PUMP_2));
        $property2->setPropertyType("height_m");
        $property2->setPropertyValue("1.5");

        $manager->persist($property2);

        $manager->flush();
    }
}
