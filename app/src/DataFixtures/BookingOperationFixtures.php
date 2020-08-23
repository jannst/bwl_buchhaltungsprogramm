<?php

namespace App\DataFixtures;

use App\Entity\BookingOperation;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Validator\Constraints\Date;

class BookingOperationFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $bookingOperations = [
            [
                "sollAccount" => "Kasse",
                "habenAccount" => "Bank",
                "amount" => 20000,
                "runningNumber" => 1,
                "description" => "Sie überweisen von der Bank an die Kasse"
            ],
            [
                "sollAccount" => "Forderungen",
                "habenAccount" => "Eigenkapital",
                "amount" => 50000,
                "runningNumber" => 2,
                "description" => "Sie stellen eine Rechnung an einen Kunden"
            ],
            [
                "sollAccount" => "Bank",
                "habenAccount" => "Forderungen",
                "amount" => 50000,
                "runningNumber" => 3,
                "description" => "Der Kunde bezahlt diese Rechnung per Überweisung"
            ],
            [
                "sollAccount" => "Fuhrpark",
                "habenAccount" => "Kasse",
                "amount" => 50000,
                "runningNumber" => 4,
                "description" => "Wir kaufen ein 2 Jahre altes Auto und bezahlen bar"
            ],
            [
                "sollAccount" => "Eigenkapital",
                "habenAccount" => "Fuhrpark",
                "amount" => 16667,
                "runningNumber" => 5,
                "description" => "Die Nutzungsdauer eines Autos beträgt 5 Jahre, buchen Sie die Jahresabschreibung"
            ],
            [
                "sollAccount" => "Eigenkapital",
                "habenAccount" => "Fuhrpark",
                "amount" => 33333,
                "runningNumber" => 6,
                "description" => "Sie fahren das Auto gegen einen Baum, Totalschaden"
            ],
            [
                "sollAccount" => "Eigenkapital",
                "habenAccount" => "Bank",
                "amount" => 20000,
                "runningNumber" => 7,
                "description" => "Sie bezahlen den Baum per Banküberweisung"
            ],
            [
                "sollAccount" => "Kasse",
                "habenAccount" => "Eigenkapital",
                "amount" => 50000,
                "runningNumber" => 8,
                "description" => "Sie nehmen einen neuen Teilhaber ins Unternehmen, dieser gibt dem Unternehmen Geld"
            ],
            [
                "sollAccount" => "Bank",
                "habenAccount" => "Bankdarlehen",
                "amount" => 25000,
                "runningNumber" => 9,
                "description" => "Sie gehen zur Bank und nehmen einen Kredit auf"
            ],
            [
                "sollAccount" => "Vorräte",
                "habenAccount" => "Verbindlichkeiten",
                "amount" => 20000,
                "runningNumber" => 10,
                "description" => "Sie bekommen eine Warenlieferung mit einer Eingangsrechnung vom Lieferanten"
            ],
            [
                "sollAccount" => "Verbindlichkeiten",
                "habenAccount" => "Bank",
                "amount" => 20000,
                "runningNumber" => 11,
                "description" => "Sie zahlen die Rechnung"
            ],
            [
                "sollAccount" => "Bank",
                "habenAccount" => "Vorräte",
                "amount" => 10000,
                "runningNumber" => 12,
                "description" => "Eine Hälfte der Warenlieferung ist verdorben, der Lieferant erstellt eine Gutschrift"
            ],
            [
                "sollAccount" => "Maschinen",
                "habenAccount" => "Bank",
                "amount" => 50000,
                "runningNumber" => 13,
                "description" => "Sie kaufen eine Maschine für € 50.000 und zahlen per Überweisung in zwei Raten"
            ],
            [
                "sollAccount" => "Kasse",
                "habenAccount" => "Eigenkapital",
                "amount" => 10000,
                "runningNumber" => 14,
                "description" => "Sie verkaufen Ihr Auto (das mit Totalschaden) an einen Liebhaber"
            ]
        ];

        $timestamp = \DateTime::createFromFormat("d.m.Y", "01.01." . date("Y"))->getTimestamp();
        foreach ($bookingOperations as $bookingOperationData) {
            $bookingOperation = new BookingOperation();
            $bookingOperation->setAmount($bookingOperationData["amount"]);
            $bookingOperation->setRunningNumber($bookingOperationData["runningNumber"]);
            $bookingOperation->setSollAccount($this->getReference($bookingOperationData["sollAccount"]));
            $bookingOperation->setHabenAccount($this->getReference($bookingOperationData["habenAccount"]));
            $bookingOperation->setYear(date("Y"));
            $bookingOperation->setBookingDate((new \DateTime())->setTimestamp($timestamp));
            $bookingOperation->setDescription($bookingOperationData["description"]);
            $timestamp += 666240;
            $manager->persist($bookingOperation);
        }

        $manager->flush();
    }
}
