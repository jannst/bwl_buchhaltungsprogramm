<?php

namespace App\DataFixtures;

use App\Entity\Project;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class ProjectFixtures extends Fixture
{
    const PROJECT_1 = "PROJECT_1";
    const PROJECT_2 = "PROJECT_2";

    public function load(ObjectManager $manager)
    {
        $project1 = new Project();

        $project1->setName("test pumper");
        $project1->setDateCreated(DateTime::createFromFormat("Y-m-d H:i:s", '2019-02-15 15:16:17'));
        $project1->setDateUpdated(DateTime::createFromFormat("Y-m-d H:i:s", '2019-03-15 00:00:17'));

        $this->addReference(self::PROJECT_1, $project1);
        $manager->persist($project1);

        $project2 = new Project();
        $project2->setName("REST pump");
        $project2->setDateCreated(DateTime::createFromFormat("Y-m-d H:i:s", '2010-11-15 10:13:10'));

        $this->addReference(Self::PROJECT_2, $project2);
        $manager->persist($project2);

        $manager->flush();
    }
}
