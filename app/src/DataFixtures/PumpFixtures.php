<?php

namespace App\DataFixtures;

use App\Entity\Pump;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class PumpFixtures extends Fixture
{
    const PUMP_1 = "PUMP_1";
    const PUMP_2 = "PUMP_2";
    const PUMP_3 = "PUMP_3";

    public function load(ObjectManager $manager)
    {
        $pump1 = new Pump();

        $pump1->setProject($this->getReference(ProjectFixtures::PROJECT_1));
        $pump1->setDateNextInspection(DateTime::createFromFormat("Y-m-d H:i:s", '2022-02-15 15:16:17'));
        $pump1->setDateManufactured(DateTime::createFromFormat("Y-m-d H:i:s", '200-01-10 15:16:17'));

        $this->addReference(self::PUMP_1, $pump1);
        $manager->persist($pump1);

        $pump2 = new Pump();

        $pump2->setProject($this->getReference(ProjectFixtures::PROJECT_2));
        $pump2->setDateNextInspection(DateTime::createFromFormat("Y-m-d H:i:s", '2022-02-15 15:16:17'));
        $pump2->setDateManufactured(DateTime::createFromFormat("Y-m-d H:i:s", '200-01-10 15:16:17'));

        $this->addReference(self::PUMP_2, $pump2);
        $manager->persist($pump2);

        $pump3 = new Pump();

        $pump3->setProject($this->getReference(ProjectFixtures::PROJECT_2));
        $pump3->setDateNextInspection(DateTime::createFromFormat("Y-m-d H:i:s", '2022-02-15 15:16:17'));
        $pump3->setDateManufactured(DateTime::createFromFormat("Y-m-d H:i:s", '200-01-10 15:16:17'));

        $this->addReference(self::PUMP_3, $pump3);
        $manager->persist($pump3);

        $manager->flush();
    }
}
