<?php

namespace App\Tests\Service;

use App\Entity\Project;
use App\Service\ProductHashGenerator;
use DateTime;
use PHPUnit\Framework\TestCase;

class ProductHashGeneratorTest extends TestCase
{

    public function testSameProjectHashesAreSame()
    {
        $proj1 = new Project();
        $proj1->setName("test project");
        $proj1->setDateCreated(DateTime::createFromFormat("Y-m-d H:i:s", '2009-02-15 15:16:17'));

        $proj2 = new Project();
        $proj2->setName("test project");
        $proj2->setDateCreated(DateTime::createFromFormat("Y-m-d H:i:s", '2009-02-15 15:16:17'));

        $hashGenerator = new ProductHashGenerator();

        $hash1 = $hashGenerator->generateProductMd5($proj1);
        $hash2 = $hashGenerator->generateProductMd5($proj2);

        self::assertEquals($hash1, $hash2);
    }

    public function testDifferntProjectHashesAreDifferent()
    {
        $proj1 = new Project();
        $proj1->setName("test project");
        $proj1->setDateCreated(DateTime::createFromFormat("Y-m-d H:i:s", '2009-02-15 15:16:17'));

        $proj2 = new Project();
        $proj2->setName("test prject");
        $proj2->setDateCreated(DateTime::createFromFormat("Y-m-d H:i:s", '2009-02-15 15:16:17'));

        $hashGenerator = new ProductHashGenerator();

        $hash1 = $hashGenerator->generateProductMd5($proj1);
        $hash2 = $hashGenerator->generateProductMd5($proj2);

        self::assertNotEquals($hash1, $hash2);
    }
}
