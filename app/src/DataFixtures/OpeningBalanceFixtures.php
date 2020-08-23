<?php

namespace App\DataFixtures;

use App\Entity\OpeningBalance;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class OpeningBalanceFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $openingBalances = [
            [
                "account" => "Maschinen",
                "amount" => 250000
            ],
            [
            "account" => "Fuhrpark",
            "amount" => 100000
            ],
            [
            "account" => "Vorräte",
            "amount" => 100000
            ],
            [
            "account" => "Forderungen",
            "amount" => 250000
            ],
            [
            "account" => "Bank",
            "amount" => 300000
            ],
            [
            "account" => "Kasse",
            "amount" => 75000
            ],
            [
            "account" => "Bankdarlehen",
            "amount" => 500000
            ],
            [
            "account" => "Verbindlichkeiten",
            "amount" => 100000
            ],
            [
            "account" => "Eigenkapital",
            "amount" => 475000
            ]
        ];

        foreach ($openingBalances as $openingBalanceData) {
            $openingBalance = new OpeningBalance();
            $openingBalance->setAccount($this->getReference($openingBalanceData["account"]));
            $openingBalance->setAmount($openingBalanceData["amount"]);
            $openingBalance->setYear(date('Y'));
            $manager->persist($openingBalance);
        }
        $manager->flush();
    }
}
