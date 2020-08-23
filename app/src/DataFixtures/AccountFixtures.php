<?php

namespace App\DataFixtures;

use App\Entity\Account;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class AccountFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $konten = [
            [
                "name" => "Maschinen",
                "typ" => "active"
            ],
            [
            "name" => "Fuhrpark",
            "typ" => "active"
            ],
            [
            "name" => "Vorräte",
            "typ" => "active"
            ],
            [
            "name" => "Forderungen",
            "typ" => "active"
            ],
            [
            "name" => "Bank",
            "typ" => "active"
            ],
            [
            "name" => "Kasse",
            "typ" => "active"
            ],
            [
            "name" => "Bankdarlehen",
            "typ" => "passive"
            ],
            [
            "name" => "Verbindlichkeiten",
            "typ" => "passive"
            ],
            [
            "name" => "Eigenkapital",
            "typ" => "passive"
            ]
        ];

        foreach ($konten as $konto) {
            $obj = new Account();
            $obj->setName($konto["name"]);
            $obj->setTyp($konto["typ"]);
            $manager->persist($obj);
            $this->addReference($konto["name"], $obj);
        }
        $manager->flush();
    }
}
